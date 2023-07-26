export default {
    data: {
        baseIconClass: 'fas',
        openClass: 'fa-minus',
        closedClass: 'fa-plus',
        openComponent: null,
        closedComponent: null,
    },

    getOptions() {
        return this.data;
    },
    setOptions(options) {
        for (const key in options) {
            if (Object.hasOwn(this.data, key)) {
                this.data[key] = options[key];
            }
        }
    },
    setOption(key, value) {
        if (!Object.hasOwn(this.data, key)) return;
        this.data[key] = value;
    },
};
