/*
 In JavaScript and with CSS, create a chat interface to give the user information about their astrology sign. The user
 will land on the page and the automated bot will ask, "What's your birthday?" The user can enter their date of birth
 and submit it. The automated bot will inform their user of their sign (Virgo, etc.) and ask then ask if they'd like to
 receive a horoscope. Depending on the user's answer of yes or no, the automated bot should be able to produce a
 horoscope or say goodbye. The horoscope can be as simple or complex as you'd like. Please use CSS (do not use Bootstrap
 or any similar framework) to style the conversation to look like a traditional chat based interface (iMessage, for
 example). Make sure to handle any errors for invalid date inputs.
 */

var AstrologyBot = {
    logId: 'log',
    inputId: 'message',
    state: 0,
    birthday: null,
    sign: null,
    init: function() {
        this.addMessage('bot', 'Welcome! I\'m the Astrology Bot. What\'s your birthday?');
        var boundHandleInput = this.handleInput.bind(this);
        this.getInput().addEventListener('keyup', function(event) {
            if (event.keyCode == 13) {
                boundHandleInput();
            }
        });
    },

    addMessage: function(className, text) {
        var message = document.createElement('span');
        message.className = className;
        if (className == 'bot') {
            message.innerHTML = text;
        }
        else {
            message.innerText = text;
        }
        var log = this.getLog();
        log.appendChild(message);
        log.scrollTop = log.scrollHeight;
    },

    handleInput: function() {
        var inputElement = this.getInput();
        var input = inputElement.value;
        inputElement.value = '';

        this.addMessage('user', input);
        input = this.sanitizeInput(input);
        if (input == 'start over') {
            this.state = 0;
            this.addMessage('bot', 'Welcome! I\'m the Astrology Bot. What\'s your birthday?');
        }
        else {
            switch (this.state) {
                case 0:
                    // handle birthday
                    if (this.validateBirthday(input)) {
                        this.addMessage('bot', this.getSign());
                        this.addMessage('bot', 'Would you like to receive a horoscope?');
                        this.state++;
                    }
                    else {
                        this.addMessage('bot', 'Sorry, I didn\'t recognize that. Please use the format MM/DD/YYY');
                    }
                    return;
                case 1:
                    // handle yes or no
                    if (this.validateYesNo(input)) {
                        if (input == 'yes') {
                            var lines = this.getHoroscope().split('\n');
                            for (var i = 0; i < lines.length; i++) {
                                this.addMessage('bot', lines[i]);
                            }
                        }
                        this.addMessage('bot', 'Goodbye.');
                        this.state++;
                    }
                    else {
                        this.addMessage('bot', 'Sorry, I didn\'t recognize that. Please say \'yes\' or \'no\'');
                    }
                    return;
                case 2:
                    if (this.validateRestart(input)) {
                        this.state = 0;
                        this.addMessage('bot', 'Welcome! I\'m the Astrology Bot. What\'s your birthday?');
                    }
                    return;
            }
        }
    },

    sanitizeInput: function(input) {
        return input;
    },

    validateBirthday: function(input) {
        this.birthday = new Date(input);
        return ! isNaN(this.birthday);
    },

    getSign: function() {
        var month = this.birthday.getMonth();
        var day = this.birthday.getDate();
        switch(month) {
            case 0:
                this.sign = day < 20 ?  'Capricorn' : 'Aquarius';
                break;
            case 1:
                this.sign = day < 19 ? 'Aquarius' : 'Pisces';
                break;
            case 2:
                this.sign = day < 21 ? 'Pisces' : 'Aries';
                break;
            case 3:
                this.sign = day < 20 ? 'Aries' : 'Taurus';
                break;
            case 4:
                this.sign = day < 21 ? 'Taurus' : 'Gemini';
                break;
            case 5:
                this.sign = day < 21 ? 'Gemini' : 'Cancer';
                break;
            case 6:
                this.sign = day < 23 ? 'Cancer' : 'Leo';
                break;
            case 7:
                this.sign = day < 23 ? 'Leo' : 'Virgo';
                break;
            case 8:
                this.sign = day < 23 ? 'Virgo' : 'Libra';
                break;
            case 9:
                this.sign = day < 23 ? 'Libra' : 'Scorpio';
                break;
            case 10:
                this.sign = day < 22 ? 'Scorpio' : 'Sagittarius';
                break;
            case 11:
                this.sign = day < 22 ? 'Sagittarius' : 'Capricorn';
                break;
        }
        return 'Your astrological sign is ' + this.sign + '.';
    },

    validateYesNo: function(input) {
        return input == 'yes' || input == 'no';
    },

    getHoroscope: function() {
        return Horoscopes[this.sign.toLowerCase()];
    },

    validateRestart: function(input) {
      return input == 'restart';
    },

    getLog: function() {
        return document.getElementById(this.logId);
    },

    getInput: function() {
        return document.getElementById(this.inputId);
    }
};

document.addEventListener("DOMContentLoaded", function(event) {
    AstrologyBot.init();
});