// /api/udid.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

// 初始化 Firebase（請確保你在 .env 中設好變數）
const firebaseConfig = {
  apiKey: "AIzaSyAWy8sDmp5Y2gL8UHij8q8GU9u4cj2Qfng",
  authDomain: "xiaohuli-sign.firebaseapp.com",
  projectId: "xiaohuli-sign",
  storageBucket: "xiaohuli-sign.appspot.com",
  messagingSenderId: "827825939368",
  appId: "1:827825939368:web:21e2ccaa12e74e8c57739d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function POST(req) {
  const body = await req.text();

  // 嘗試從 XML 中提取 UDID
  const udidMatch = body.match(/<key>UDID<\/key>\s*<string>([^<]+)<\/string>/);
  const udid = udidMatch ? udidMatch[1] : null;

  if (!udid) {
    return NextResponse.json({ error: 'UDID not found' }, { status: 400 });
  }

  // 寫入 Firestore
  await setDoc(doc(db, 'udids', udid), {
    udid,
    timestamp: serverTimestamp()
  });

  // 成功後跳轉頁面
  return NextResponse.redirect('https://xiaohuliii.vercel.app/udid.html');
}
