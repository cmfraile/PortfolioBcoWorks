import SpectatorLayout from "../../pages/layout/SpectatorLayout"
import BannerPage from "../../pages/banner";
import AboutPage from "../../pages/about";
import WorksPage from "../../pages/works";
import ContactPage from "../../pages/contact";
import PricesPage from "../../pages/prices";
import { useRef } from "react";

const MidScroll = () => {

    const midRef = useRef<HTMLDivElement>((<div/>).type);
    return (<div ref={midRef}><BannerPage/><AboutPage/><WorksPage/><PricesPage/><ContactPage/></div>)

}

const SpectatorContent = () => <SpectatorLayout><MidScroll/></SpectatorLayout>

export default SpectatorContent