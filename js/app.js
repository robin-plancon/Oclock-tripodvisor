/* 
    1. Ajouter un event listener sur le lien de la newsletter
    2. Creer un handler pour gerer le click sur le lien newsletter
    3. Ajouter un event listener sur le bouton de fermeture du popup
    4. Ajouter un handler pour la fermeture du popup
    5. Ajouter un eventlistener qui verifie la distance scroller 
    pour afficher le popup newsletter

    bonus
    Pour gerer les themes: ajouter la class sur le body

    #Pour le slider
    1. Il faut ajouter les img entre les deux boutons.
    2. Ensuite ajouter une div avec class="slider__nav"
    3. Creer autant de div avec class="slider__nav-item" qu'il y a d'img 
    4. Rendre le tout cliquable et gerer le clique

    #Pour les avis
    1. Creer un parametre contenant un tableau avec les types d'avis que l'on veut afficher
    2. Rendre les radio boutons ecoutable
    3. Gerer le changement de valeur et le rafraichissement des avis
    
*/

const app = {
    newsletterLinkElement: document.getElementById("newsletter-link"),
    newsletterPopUpElement: document.querySelector(".newsletter"),
    newsletterSubmitButtonElement: document.getElementById(
        "submit-subcriber-email"
    ),
    switchThemeButtonElement: document.getElementById("theme-switch"),
    switchColorsElement: document.getElementById("theme-colors"),
    lastScrollPosition: 0,
    isNewsletterHidden: true,
    isDarkModeTheme: false,
    currentColorTheme: "",
    sliderPhotographyNames: [
        "canyon",
        "city",
        "nature",
        "ocean",
        "road",
        "ski",
    ],
    forbiddenDomains: [
        "@yopmail.com",
        "@yopmail.fr",
        "@yopmail.net",
        "@cool.fr.nf",
        "@jetable.fr.nf",
        "@courriel.fr.nf",
        "@moncourrier.fr.nf",
        "@monemail.fr.nf",
        "@monmail.fr.nf",
        "@hide.biz.st",
        "@mymail.infos.st",
    ],
    currentSliderPhotography: 0,
    reviewsFilter: [],

    setElementListenable(element, eventListenerType, eventHandler) {
        element.addEventListener(eventListenerType, eventHandler);
    },

    setWindowsScrollListenable() {
        document.addEventListener("scroll", app.handleWindowsScroll);
    },

    // Newsletter part

    handleNewsletterLinkClick(Event) {
        Event.preventDefault();
        app.setNewsletterPopUpOpen(app.newsletterPopUpElement);
    },

    handleNewsletterClosingClick(Event) {
        Event.preventDefault();
        app.setNewsletterPopUpClose(app.newsletterPopUpElement);
    },

    handleNewsletterSubcriberSubmit(Event) {
        Event.preventDefault();
        const email = document.getElementById("subscriber-email").value;
        if (app.validateEmail(email)) {
            alert("Merci de vous être inscrit à notre newsletter.");
        }
    },

    handleWindowsScroll() {
        if (
            window.scrollY - app.lastScrollPosition >= 300 &&
            app.isNewsletterHidden
        ) {
            app.setNewsletterPopUpOpen(app.newsletterPopUpElement);
            app.lastScrollPosition = window.scrollY;
            return;
        }
        if (!app.isNewsletterHidden) {
            app.lastScrollPosition = window.scrollY;
        }
        if (app.isNewsletterHidden && window.scrollY < app.lastScrollPosition) {
            app.lastScrollPosition = window.scrollY;
        }
    },

    setNewsletterPopUpOpen(element) {
        element.classList.remove("newsletter--hidden");
        app.isNewsletterHidden = false;
    },

    setNewsletterPopUpClose(element) {
        element.classList.add("newsletter--hidden");
        app.isNewsletterHidden = true;
    },

    validateEmail(email) {
        const emailRegex = new RegExp(
            /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
            "gm"
        );
        if (!emailRegex.test(email)) {
            alert("adresse email non valide.");
            return false;
        }
        app.forbiddenDomains.map((forbiddenDomain) => {
            if (email.includes(forbiddenDomain)) {
                alert(
                    `le domaine ${forbiddenDomain} de l'adresse mail n'est pas authorise`
                );
                return false;
            }
        });
        return true;
    },

    // Theme part

    handleChangeThemeClick() {
        app.isDarkModeTheme = !app.isDarkModeTheme;
        const bodyElement = document.getElementsByTagName("body")[0];
        if (app.isDarkModeTheme) {
            bodyElement.classList.add("theme-dark");
            return;
        } else {
            bodyElement.classList.remove("theme-dark");
            return;
        }
    },

    handleChangeThemeColorClick(Event) {
        const target = Event.target;
        const bodyElement = document.getElementsByTagName("body")[0];
        if (app.currentColorTheme === "") {
            bodyElement.classList.add(target.id);
            app.currentColorTheme = target.id;
            return;
        }
        bodyElement.classList.replace(app.currentColorTheme, target.id);
        app.currentColorTheme = target.id;
    },

    initializeColorThemeButtons() {
        colorButtons = app.switchColorsElement.children;
        for (colorButton of colorButtons) {
            app.setElementListenable(
                colorButton,
                "click",
                this.handleChangeThemeColorClick
            );
        }
    },

    // slider part

    initializeSliderPhotographies() {
        const sliderElement = document.querySelector(".slider");
        const sliderNavElement = document.querySelector(".slider__nav");
        app.sliderPhotographyNames.map((sliderPhotographyName, index) => {
            const imageElement = document.createElement("img");
            imageElement.setAttribute(
                "src",
                `./img/${sliderPhotographyName}.jpg`
            );
            imageElement.setAttribute("id", `slider-${sliderPhotographyName}`);
            imageElement.classList.add("slider__img");
            if (index === 0) {
                imageElement.classList.add("slider__img--current");
            }
            sliderElement.appendChild(imageElement);
            const sliderNavItemElement = document.createElement("div");
            sliderNavItemElement.setAttribute(
                "id",
                `slider-nav-${sliderPhotographyName}`
            );
            sliderNavItemElement.classList.add("slider__nav-item");
            sliderNavElement.appendChild(sliderNavItemElement);
        });
    },

    InitializeSliderButtons() {
        sliderButtons = document.querySelectorAll(".slider__btn");
        for (sliderButton of sliderButtons) {
            app.setElementListenable(
                sliderButton,
                "click",
                app.sliderButtonClickHandler
            );
        }
    },

    sliderButtonClickHandler(Event) {
        const target = Event.target;
        const sliderImagesElement = document.querySelectorAll(".slider__img");
        if (target.id === "slider-button-previous") {
            sliderImagesElement[app.currentSliderPhotography].classList.remove(
                "slider__img--current"
            );
            if (app.currentSliderPhotography === 0) {
                app.currentSliderPhotography =
                    (sliderImagesElement.length - 1) %
                    sliderImagesElement.length;
            } else {
                app.currentSliderPhotography -= 1;
            }
            sliderImagesElement[app.currentSliderPhotography].classList.add(
                "slider__img--current"
            );
            return;
        }
        if (target.id === "slider-button-next") {
            sliderImagesElement[app.currentSliderPhotography].classList.remove(
                "slider__img--current"
            );
            if (
                app.currentSliderPhotography ===
                sliderImagesElement.length - 1
            ) {
                app.currentSliderPhotography = 0;
            } else {
                app.currentSliderPhotography += 1;
            }
            sliderImagesElement[app.currentSliderPhotography].classList.add(
                "slider__img--current"
            );
        }
    },

    // Reviews part

    initializeReviewsFiltersButtons() {
        const reviewsFilterCheckboxes = document.querySelectorAll(
            "input[name='rating']"
        );
        for (reviewsFilterCheckbox of reviewsFilterCheckboxes) {
            app.reviewsFilter.push(reviewsFilterCheckbox.value);
            app.setElementListenable(
                reviewsFilterCheckbox,
                "change",
                app.reviewsFilterCheckboxesHandler
            );
        }
    },

    reviewsFilterCheckboxesHandler(Event) {
        const target = Event.target;
        const reviewsElements = document.querySelectorAll(".review");
        if (target.checked) {
            app.reviewsFilter.push(target.value);
        } else {
            app.reviewsFilter.splice(
                app.reviewsFilter.indexOf(target.value),
                1
            );
        }
        for (reviewElement of reviewsElements) {
            if (
                !app.reviewsFilter.includes(
                    reviewElement.getAttribute("data-rating")
                )
            ) {
                reviewElement.classList.add("review--hidden");
            }
            if (
                app.reviewsFilter.includes(
                    reviewElement.getAttribute("data-rating")
                ) &&
                reviewElement.classList.contains("review--hidden")
            ) {
                reviewElement.classList.remove("review--hidden");
            }
        }
    },

    init() {
        app.setElementListenable(
            app.newsletterLinkElement,
            "click",
            app.handleNewsletterLinkClick
        );
        app.setElementListenable(
            app.newsletterPopUpElement.querySelector(".newsletter__close"),
            "click",
            app.handleNewsletterClosingClick
        );
        app.setElementListenable(
            app.newsletterSubmitButtonElement,
            "click",
            app.handleNewsletterSubcriberSubmit
        );
        app.setWindowsScrollListenable();
        app.setNewsletterPopUpClose(app.newsletterPopUpElement);
        app.setElementListenable(
            app.switchThemeButtonElement,
            "click",
            app.handleChangeThemeClick
        );
        app.initializeColorThemeButtons();
        app.initializeSliderPhotographies();
        app.InitializeSliderButtons();
        app.initializeReviewsFiltersButtons();
    },
};

document.addEventListener("DOMContentLoaded", app.init);
