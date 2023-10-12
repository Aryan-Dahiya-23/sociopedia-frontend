import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header, Notification, Navigation } from "./index"

const NotificationPage = () => {

    const { pathname } = useLocation();

    useEffect(() => {
        window.scroll(0, 0);
      }, [pathname])

    return (
        <div>
            <Header />
            <Notification />
            <Navigation />
        </div>
    );
}

export default NotificationPage;