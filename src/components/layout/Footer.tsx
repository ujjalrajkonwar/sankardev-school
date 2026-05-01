import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[--color-border] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white text-sm font-bold">S</span>
              </div>
              <p className="font-semibold text-primary">
                Sankardev Sishu Vidya Niketan
              </p>
            </div>
            <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
              Mathurapur, Charaideo, Assam. Established at 2000.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="label-text mb-4">Quick Links</p>
            <nav className="space-y-2.5">
              <Link
                href="/admissions"
                className="block text-sm text-[--color-primary] hover:text-[--color-primary-dark] transition-colors underline-offset-4 hover:underline"
              >
                Admissions
              </Link>
              <Link
                href="/portal"
                className="block text-sm text-[--color-primary] hover:text-[--color-primary-dark] transition-colors underline-offset-4 hover:underline"
              >
                Student Portal
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="label-text mb-4">Contact</p>
            <div className="space-y-2.5 text-sm text-[--color-primary]">
              <p>info@sankardev.edu</p>
              <p>+91 98765 43210</p>
              <p>Mathurapur, Charaideo, Assam</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[--color-border]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-xs text-[--color-muted-foreground]">
            © {new Date().getFullYear()} Sankardev Sishu Vidya Niketan
            Mathurapur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
