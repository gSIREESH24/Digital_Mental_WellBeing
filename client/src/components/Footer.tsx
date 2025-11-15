import { Heart, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              <span className="font-accent text-xl font-bold">MindEase Campus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your Mental Health, Our Priority
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-lg" data-testid="link-social-twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-lg" data-testid="link-social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover-elevate active-elevate-2 p-2 rounded-lg" data-testid="link-social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/privacy">
                <a className="text-sm text-muted-foreground hover-elevate active-elevate-2 inline-block px-2 py-1 rounded-lg" data-testid="link-footer-privacy">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-sm text-muted-foreground hover-elevate active-elevate-2 inline-block px-2 py-1 rounded-lg" data-testid="link-footer-terms">
                  Terms of Service
                </a>
              </Link>
              <Link href="/faq">
                <a className="text-sm text-muted-foreground hover-elevate active-elevate-2 inline-block px-2 py-1 rounded-lg" data-testid="link-footer-faq">
                  FAQ
                </a>
              </Link>
              <Link href="/crisis">
                <a className="text-sm text-muted-foreground hover-elevate active-elevate-2 inline-block px-2 py-1 rounded-lg" data-testid="link-footer-crisis">
                  Crisis Resources
                </a>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get Help Now</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Crisis Hotline:</strong>
                <br />
                988 Suicide & Crisis Lifeline
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Text Support:</strong>
                <br />
                Text HOME to 741741
              </p>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MindEase Campus. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This platform is not a substitute for professional mental health care. If you're in crisis, please contact emergency services.
          </p>
        </div>
      </div>
    </footer>
  );
}
