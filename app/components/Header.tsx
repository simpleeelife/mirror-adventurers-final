// app/components/Header.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-bg/80 backdrop-blur-md border-b border-accent-main/20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* サイトロゴ */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="font-orbitron text-xl font-bold bg-gradient-to-r from-accent-sub to-accent-main bg-clip-text text-transparent"
            >
              Adventurers in the Mirror
            </Link>
          </div>

          {/* PC向けメニュー */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/portal" className="font-teko text-2xl text-text-base hover:text-accent-main transition-colors">
              The Portal
            </Link>
            <Link href="/#about" className="font-teko text-2xl text-text-base hover:text-accent-main transition-colors">
              About
            </Link>
            <Link href="/#connect" className="font-teko text-2xl px-4 py-1 bg-secondary-bg/80 border border-accent-main/30 rounded-md text-accent-main hover:bg-secondary-bg transition-colors">
              Join
            </Link>
          </nav>

          {/* SP向けハンバーガーボタン */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-base hover:text-accent-main focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* SP向け開閉メニュー */}
      {isOpen && (
        <div className="md:hidden">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <Link href="/portal" onClick={() => setIsOpen(false)} className="block py-2 font-teko text-2xl text-text-base hover:text-accent-main transition-colors">
              The Portal
            </Link>
            <Link href="/#about" onClick={() => setIsOpen(false)} className="block py-2 font-teko text-2xl text-text-base hover:text-accent-main transition-colors">
              About
            </Link>
            <Link href="/#connect" onClick={() => setIsOpen(false)} className="block py-2 font-teko text-2xl text-accent-main">
              Join
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}