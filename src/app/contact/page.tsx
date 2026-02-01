import { Mail, Phone, MessageSquare } from "lucide-react";
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
      <p className="text-xl text-muted-foreground mb-12">Have questions or feedback? We&apos;d love to hear from you.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
        <div className="space-y-8">
          <div className="flex gap-4"><div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><Mail size={24} /></div><div><h3 className="text-lg font-bold mb-1">Email</h3><a href="mailto:info@yashdhanjwal.com" className="text-brand-primary font-medium hover:underline">info@yashdhanjwal.com</a></div></div>
          <div className="flex gap-4"><div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><Phone size={24} /></div><div><h3 className="text-lg font-bold mb-1">Phone</h3><a href="tel:+918766356943" className="text-brand-primary font-medium hover:underline">+91 87663 56943</a></div></div>
          <div className="flex gap-4"><div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0"><MessageSquare size={24} /></div><div><h3 className="text-lg font-bold mb-1">WhatsApp</h3><a href="https://wa.me/919990033043" className="text-brand-primary font-medium hover:underline">+91 99900 33043</a></div></div>
        </div>
      </div>
    </div>
  );
}
