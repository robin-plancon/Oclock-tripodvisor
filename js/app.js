/* 
    1. Ajouter un event listener sur le lien de la newsletter
    2. Creer un handler pour gerer le click sur le lien newsletter
    3. Ajouter un event listener sur le bouton de fermeture du popup
    4. Ajouter un handler pour la fermeture du popup
    5. Ajouter un eventlistener qui verifie la distance scroller 
    pour afficher le popup newsletter

    utiliser le parametre hidden pour cacher la newsletter
*/

const app = {

    NewsletterLinkElement: document.getElementById("newsletter-link"),
    NewsletterPopUpElement: document.querySelector(".newsletter"),
    lastScrollPosition: 0,
    isNewsletterHidden: true,

    setElementListenable (element, eventListenerType) {
        element.addEventListener(eventListenerType, app.handleElementClick);
    },

    handleElementClick (Event) {
        Event.preventDefault();
        const targetLink = Event.target;
        if(targetLink.id === "newsletter-link") {
            app.setNewsletterPopUpOpen(app.NewsletterPopUpElement);
            return;
        }
        if(targetLink.classList.contains("newsletter__close")) {
            app.setNewsletterPopUpClose(app.NewsletterPopUpElement);
            return;
        }
    },

    setWindowsScrollListenable () {
        document.addEventListener("scroll", app.handleWindowsScroll); 
    },

    handleWindowsScroll () {
        if (window.scrollY - app.lastScrollPosition >= 300 && app.isNewsletterHidden) {
            app.setNewsletterPopUpOpen(app.NewsletterPopUpElement);
            app.lastScrollPosition = window.scrollY;
            return;
        }
        if (!app.isNewsletterHidden) {
            app.lastScrollPosition = window.scrollY;
        }
    },

    setNewsletterPopUpOpen (element) {
        element.classList.remove("newsletter--hidden");
        app.isNewsletterHidden = false;
    },

    setNewsletterPopUpClose (element) {
        element.classList.add("newsletter--hidden");
        app.isNewsletterHidden = true;
    },

    init () {
        app.setElementListenable(app.NewsletterLinkElement, "click");
        app.setElementListenable(app.NewsletterPopUpElement.querySelector(".newsletter__close"), "click");
        app.setWindowsScrollListenable();
        app.setNewsletterPopUpClose(app.NewsletterPopUpElement);
    },

}

document.addEventListener("DOMContentLoaded", app.init);
