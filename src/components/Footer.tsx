import Link from "next/link";
import { Mail, Phone, MessageSquare, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Free Online Tools by Yash Dhanjwal</h3>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              Providing professional-grade translation and dictionary tools for students, writers, and global users. 100% free and secure.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-brand-primary" />
                <a href="https://www.yashdhanjwal.com" target="_blank" className="hover:underline">www.yashdhanjwal.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-primary" />
                <a href="mailto:info@yashdhanjwal.com" className="hover:underline">info@yashdhanjwal.com</a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-brand-primary transition-colors">Home</Link></li>
              <li><Link href="/languages" className="hover:text-brand-primary transition-colors">Languages</Link></li>
              <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-primary transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground text-base">Created by Yash Dhanjwal</p>
            <p>B.Tech Student | New Delhi, India</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-brand-primary" />
              <a href="tel:+918766356943" className="hover:underline">+91 87663 56943</a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare size={16} className="text-brand-primary" />
              <a href="https://wa.me/919990033043" className="hover:underline">+91 99900 33043</a>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            © 2026 Free Online Tools by Yash Dhanjwal. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
