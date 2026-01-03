import Container from '@/components/shared/Container'
import classNames from '@/utils/classNames'
import { APP_NAME } from '@/constants/app.constant'
import { Link } from 'react-router-dom'
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    MapPin,
    Phone,
    Mail,
} from 'lucide-react'
import Logo from './Logo'

type FooterProps = {
    className?: string
}

const FooterContent = () => {
    const footerLinks = {
        product: [
            { label: 'Features', href: '#features' },
            { label: 'Billing', href: '#billing' },
            { label: 'Inventory', href: '#inventory' },
            { label: 'Integrations', href: '#integrations' },
            { label: 'Pricing', href: '#pricing' },
        ],
        company: [
            { label: 'About Us', href: '#' },
            { label: 'Careers', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Press', href: '#' },
            { label: 'Partners', href: '#' },
        ],
        support: [
            { label: 'Help Center', href: '#' },
            { label: 'Contact Us', href: '#' },
            {
                label: 'API Documentation',
                href: 'https://rms.nexiotech.cloud/api/api',
            },
            { label: 'Status', href: '#' },
        ],
        legal: [
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms of Service', href: '/terms-and-conditions' },
            { label: 'Cookie Policy', href: '/cookie-policy' },
        ],
    }

    return (
        <div className="flex items-center bg-foreground dark:bg-gray-900 text-background dark:text-foreground justify-between w-full">
            <div className=" mx-auto px-4 lg:px-8 py-12 lg:py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Logo & Info */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Link to="/">
                                <Logo logoWidth={120} />
                            </Link>
                        </div>
                        <p className="text-background/70 dark:text-foreground mb-6">
                            India's #1 Restaurant POS software trusted by over
                            1,00,000 restaurants to manage their operations
                            efficiently.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-background/70 dark:text-foreground">
                                <Phone size={18} />
                                <span>+91 78774 52256</span>
                            </div>
                            <div className="flex items-center gap-3 text-background/70 dark:text-foreground">
                                <Mail size={18} />
                                <span>connect@nexiotech.cloud</span>
                            </div>
                            <div className="flex items-center gap-3 text-background/70 dark:text-foreground">
                                <Mail size={18} />
                                <span>cto@nexiotech.cloud</span>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 dark:text-foreground hover:text-background transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 dark:text-foreground hover:text-background transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={link.href}
                                        className="text-background/70 dark:text-foreground hover:text-background transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-background/70 dark:text-foreground hover:text-background transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-background/10 dark:border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-background/60 dark:text-foreground text-sm">
                        © {new Date().getFullYear()} RestoPOS. All rights
                        reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#"
                            className="text-background/60 dark:text-foreground hover:text-background transition-colors"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-background/60 dark:text-foreground hover:text-background transition-colors"
                        >
                            <Twitter size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-background/60 dark:text-foreground hover:text-background transition-colors"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-background/60 dark:text-foreground hover:text-background transition-colors"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-background/60 dark:text-foreground hover:text-background transition-colors"
                        >
                            <Youtube size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Footer({ className }: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16`,
                className,
            )}
        >
            <FooterContent />
        </footer>
    )
}
