import { Mail, Phone, MessageSquare, Globe } from "lucide-react";
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-xl text-muted-foreground">Empowering global communication through free, accessible, and high-quality language tools.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">Free Online Tools by Yash Dhanjwal was born out of a desire to provide students, professionals, and language enthusiasts with reliable web tools without any barriers.</p>
        </div>
        <div className="bg-brand-primary/5 rounded-3xl p-8 border border-brand-primary/20">
          <h3 className="text-2xl font-bold mb-4">Meet the Creator</h3>
          <div className="space-y-4">
            <p className="font-bold text-lg">Yash Dhanjwal</p>
            <p className="text-muted-foreground">B.Tech Student | New Delhi, India</p>
            <div className="pt-4 space-y-3">
              <div className="flex items-center gap-3"><Globe className="text-brand-primary" size={20} /><a href="https://www.yashdhanjwal.com" className="hover:underline">www.yashdhanjwal.com</a></div>
              <div className="flex items-center gap-3"><Mail className="text-brand-primary" size={20} /><a href="mailto:info@yashdhanjwal.com" className="hover:underline">info@yashdhanjwal.com</a></div>
              <div className="flex items-center gap-3"><Phone className="text-brand-primary" size={20} /><a href="tel:+918766356943" className="hover:underline">+91 87663 56943</a></div>
              <div className="flex items-center gap-3"><MessageSquare className="text-brand-primary" size={20} /><a href="https://wa.me/919990033043" className="hover:underline">+91 99900 33043</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
