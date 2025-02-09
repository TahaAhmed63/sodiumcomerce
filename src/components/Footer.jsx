import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white border-top border-primary py-5">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">SHOP</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#" className="text-muted text-decoration-none">New Arrivals</Link>
              </li>
              <li>
                <Link href="#" className="text-muted text-decoration-none">Best Sellers</Link>
              </li>
              <li>
                <Link href="#" className="text-muted text-decoration-none">Sale</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">HELP</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#" className="text-muted text-decoration-none">Contact Us</Link>
              </li>
              <li>
                <Link href="#" className="text-muted text-decoration-none">FAQs</Link>
              </li>
              <li>
                <Link href="#" className="text-muted text-decoration-none">Shipping</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">ABOUT</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="#" className="text-muted text-decoration-none">Our Story</Link>
              </li>
              <li>
                <Link href="#" className="text-muted text-decoration-none">Careers</Link>
              </li>
              <li>
                <Link href="#" className="text-muted text-decoration-none">Press</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h5 className="fw-bold mb-3">NEWSLETTER</h5>
            <p className="text-muted">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="input-group">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
              />
              <button type="submit" className="btn btn-primary">
                <ChevronRight className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;