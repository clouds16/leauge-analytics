import React from "react";
import Footer from './common/Footer'
import Header from './common/Header'
import Container from 'react-bootstrap/Container';
import { headerLinks, footerLinks } from "./utils";

const Layout = ({ children }) => {
    return (
        <>
            <Header title="League Analytics" links={headerLinks} />
            <Container>
                {children}
            </Container>
            <Footer
                copyrightYear={new Date().getFullYear()}
                companyName="League Analytics Inc."
                links={footerLinks}
            />
        </>
    );
}

export default Layout;