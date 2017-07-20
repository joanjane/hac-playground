export {}

declare global {
    interface Date {
        /**
         * Return yyyy-MM-dd formatted string
         */
        formatDatePart(): string;

        /**
         * This method removes the timezone difference with UTC to fix problems when serializing date with toJSON()
         * which changes the date part.
         */
        asUTC(): Date;
    }
}

Date.prototype.formatDatePart = function() {
    return this.getFullYear() + '-' +
        ((this.getMonth() + 1 < 10) ? '0' : '') + (this.getMonth() + 1) + '-' +
        (this.getDate() < 10 ? '0' : '') + this.getDate();
};

Date.prototype.asUTC = function() {
    var date = new Date(this);
    date.setHours(this.getHours() - (this.getTimezoneOffset() / 60));
    return date;
};