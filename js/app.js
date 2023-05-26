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

    setNewsletterPopUpOpen (element) {
        element.classList.remove("newsletter--hidden");
    },

    setNewsletterPopUpClose (element) {
        element.classList.add("newsletter--hidden");
    },

    handleNewsletterClosingButtonClick () {

    },

    setWindowsScrollListenable () {

    },

    init () {
        app.setElementListenable(app.NewsletterLinkElement, "click");
        app.setElementListenable(app.NewsletterPopUpElement.querySelector(".newsletter__close"), "click")
        app.setNewsletterPopUpClose(app.NewsletterPopUpElement);
    },

}

document.addEventListener("DOMContentLoaded", app.init);
