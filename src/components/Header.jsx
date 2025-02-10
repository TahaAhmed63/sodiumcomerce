'use client';

import Link from 'next/link';
import { useState } from 'react';
import { User, ShoppingBag, Facebook, Twitter, Instagram, Search, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '@/store/slice/cartslice';
import logo from './../assest/newsodium.png';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './header.css';

const VimeoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.4077 0-2.5931-1.2837-3.5697-3.8753-.6498-2.3467-1.2995-4.7038-1.9492-7.0515-.7236-2.5835-1.4961-3.8846-2.3303-3.8846-.1813 0-.8188.3794-1.9054 1.1377l-1.1395-1.4434c1.1986-1.0398 2.3784-2.0797 3.567-3.1195 1.6095-1.3762 2.8192-2.0991 3.6295-2.1679 1.9075-.1837 3.0825 1.1143 3.5233 3.8928.4762 2.9776.8079 4.8262.9973 5.5429.5537 2.4876 1.1619 3.7314 1.8242 3.7314.5153 0 1.2906-.807 2.3242-2.4229 1.0307-1.6159 1.5826-2.8468 1.6558-3.6925.1476-1.3969-.4029-2.0987-1.6558-2.0987-.5912 0-1.1987.1341-1.8241.3991 1.2112-3.9081 3.5189-5.8045 6.9235-5.6869 2.5242.0828 3.7148 1.6886 3.5697 4.8366z" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();


  const cartItems = useSelector((state) => state.cart.items);
  return (
    <div className="sticky-top bg-black text-dark">
      {/* Top Header */}
      <div className="d-flex align-items-center bg-dark text-white py-3 px-4">
        <div className="d-flex flex-grow-1 align-items-center">
          <button className="btn btn-outline-light d-lg-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="d-none d-lg-flex gap-3">
            <Link href="#"><Facebook className="h-4 w-4 text-white" /></Link>
            <Link href="#"><Twitter className="h-4 w-4 text-white" /></Link>
            <Link href="#"><Instagram className="h-4 w-4 text-white" /></Link>
            <Link href="#"><VimeoIcon /></Link>
          </div>
        </div>
        <div className="d-flex gap-3">
          <button className="btn btn-outline-light"><Search className="h-5 w-5" /></button>
          <button className="btn btn-outline-light"><User className="h-5 w-5" /></button>
          <button className="btn btn-outline-light position-relative" onClick={() => dispatch(toggleCart())}>
            <ShoppingBag className="h-5 w-5" />
            <span className="badge bg-warning position-absolute" style={{ top: '-5px', right: '-5px', fontSize: '12px', padding: '5px 8px' }}>{cartItems?.length}</span>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
          <X className="h-6 w-6" />
        </button>
        <nav className="nav flex-column">
          <Link className="nav-link" href="/">HOME</Link>
          <Link className="nav-link" href="/new-arrivals">NEW ARRIVAL</Link>
          <Link className="nav-link" href="/best-selling">BEST SELLING</Link>
          <Link className="nav-link" href="/about">ABOUT</Link>
        </nav>
      </div>

      {/* Categories Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center w-100">
            <ul className="navbar-nav d-none d-lg-flex">
              <li className="nav-item"><Link className="nav-link" href="/">HOME</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/new-arrivals">NEW ARRIVAL</Link></li>
            </ul>
            <Link className="navbar-brand mx-5" href="/">
              <Image src={logo} width={240} height={120} alt="Sodium Fashion Shop" priority />
            </Link>
            <ul className="navbar-nav d-none d-lg-flex">
              <li className="nav-item"><Link className="nav-link" href="/best-selling">BEST SELLING</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/about">ABOUT</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
