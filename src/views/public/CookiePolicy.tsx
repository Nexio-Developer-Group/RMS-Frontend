import LegalLayout from './components/LegalLayout'

const CookiePolicy = () => {
    return (
        <LegalLayout title="Cookie Policy" lastUpdated="January 03, 2026">
            <section>
                <p>
                    This is the Cookie Policy for RestoPOS, accessible from
                    restopos.com.
                </p>
                <p>
                    As is common practice with almost all professional websites,
                    this site uses cookies, which are tiny files that are
                    downloaded to your computer, to improve your experience.
                    This page describes what information they gather, how we use
                    it and why we sometimes need to store these cookies.
                </p>
            </section>

            <section>
                <h2>What Are Cookies</h2>
                <p>
                    Cookies are small pieces of text sent by your web browser by
                    a website you visit. A cookie file is stored in your web
                    browser and allows the Service or a third-party to recognize
                    you and make your next visit easier and the Service more
                    useful to you.
                </p>
            </section>

            <section>
                <h2>How We Use Cookies</h2>
                <p>
                    We use cookies for a variety of reasons detailed below.
                    Unfortunately, in most cases, there are no industry standard
                    options for disabling cookies without completely disabling
                    the functionality and features they add to this site. It is
                    recommended that you leave on all cookies if you are not
                    sure whether you need them or not in case they are used to
                    provide a service that you use.
                </p>
            </section>

            <section>
                <h2>The Cookies We Set</h2>
                <ul>
                    <li>
                        <strong>Account related cookies:</strong> If you create
                        an account with us then we will use cookies for the
                        management of the signup process and general
                        administration.
                    </li>
                    <li>
                        <strong>Login related cookies:</strong> We use cookies
                        when you are logged in so that we can remember this
                        fact. This prevents you from having to log in every
                        single time you visit a new page.
                    </li>
                    <li>
                        <strong>Processing related cookies:</strong> This site
                        offers e-commerce or payment facilities and some cookies
                        are essential to ensure that your order is remembered
                        between pages so that we can process it properly.
                    </li>
                </ul>
            </section>

            <section>
                <h2>Third Party Cookies</h2>
                <p>
                    In some special cases, we also use cookies provided by
                    trusted third parties. The following section details which
                    third party cookies you might encounter through this site.
                </p>
                <ul>
                    <li>
                        This site uses Google Analytics which is one of the most
                        widespread and trusted analytics solution on the web for
                        helping us to understand how you use the site and ways
                        that we can improve your experience.
                    </li>
                </ul>
            </section>

            <section>
                <h2>Disabling Cookies</h2>
                <p>
                    You can prevent the setting of cookies by adjusting the
                    settings on your browser (see your browser Help for how to
                    do this). Be aware that disabling cookies will affect the
                    functionality of this and many other websites that you
                    visit.
                </p>
            </section>

            <section>
                <h2>More Information</h2>
                <p>
                    Hopefully that has clarified things for you and as was
                    previously mentioned if there is something that you aren't
                    sure whether you need or not it's usually safer to leave
                    cookies enabled in case it does interact with one of the
                    features you use on our site.
                </p>
                <p>
                    However, if you are still looking for more information then
                    you can contact us through one of our preferred contact
                    methods:
                </p>
                <ul>
                    <li>Email: hello@restopos.com</li>
                </ul>
            </section>
        </LegalLayout>
    )
}

export default CookiePolicy
