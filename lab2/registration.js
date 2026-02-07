document.addEventListener("DOMContentLoaded", () => {
    const userElement = document.querySelector("[data-registered-user]");
    const storedUser = localStorage.getItem("registeredUser");
    let user = null;

    if (storedUser) {
        try {
            user = JSON.parse(storedUser);
        } catch (error) {
            user = null;
        }
    }

    const signoutLink = document.querySelector("#signout-link");
    
    if (userElement) {
        if (user && user.firstName) {
            userElement.textContent = `Welcome, ${user.firstName}`;
            userElement.hidden = false;
            if (signoutLink) {
                signoutLink.hidden = false;
            }
        } else {
            userElement.textContent = "";
            userElement.hidden = true;
            if (signoutLink) {
                signoutLink.hidden = true;
            }
        }
    }

    const form = document.querySelector("form.form");
    const artcenterContainer = document.querySelector(".artcenter");
    const formContainer = form?.parentElement;
    
    if (form) {
        if (user && user.firstName) {
            form.hidden = true;
            if (artcenterContainer) {
                artcenterContainer.hidden = true;
            }
            
            // Show already registered message if it doesn't exist
            if (!document.querySelector(".already-registered")) {
                const message = document.createElement("div");
                message.className = "already-registered artcenter";
                message.style.marginTop = "2rem";
                message.innerHTML = `<article>You are already registered. Please <a class="h3" href="SignOut.html">sign out</a> if you want to register with a different account.</article>`;
                formContainer?.parentElement?.insertBefore(message, formContainer);
            }
        } else {
            form.hidden = false;
            if (artcenterContainer) {
                artcenterContainer.hidden = false;
            }
            const alreadyRegistered = document.querySelector(".already-registered");
            if (alreadyRegistered) {
                alreadyRegistered.remove();
            }
        }
        form.addEventListener("submit", () => {
            const firstName = form.querySelector("#first-name")?.value.trim();
            const lastName = form.querySelector("#last-name")?.value.trim();
            const email = form.querySelector("#email")?.value.trim();
            const birthDate = form.querySelector("#birth-date")?.value || "";
            const interest = form.querySelector("#interest")?.value || "";

            if (firstName && lastName && email) {
                const payload = {
                    firstName,
                    lastName,
                    email,
                    birthDate,
                    interest
                };
                localStorage.setItem("registeredUser", JSON.stringify(payload));
                
                // Update the user display
                if (userElement) {
                    userElement.textContent = `Welcome, ${firstName}`;
                    userElement.hidden = false;
                }
                if (signoutLink) {
                    signoutLink.hidden = false;
                }
            }
        });
    }
});
