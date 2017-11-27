export default class Loader {

    constructor(target, modifier) {
        if (typeof target === 'string') {
            this.target = document.querySelectorAll(target);
        } else {
            this.target = target || document.querySelector('body');
        }

        if (!this.target.length) {
            this.target = [this.target];
        }

        this.modifier = modifier;
    }

    stop() {
        this.loaderIds.forEach(id => {
            const thisLoader = document.querySelector('[data-loader-id="' + id + '"]');
        if (thisLoader) {
            thisLoader.remove();
        }
    });
    }

    start() {
        this.loaderIds = [];

        this.target.forEach((currentTarget, i) => {
            const currentTargetLoader = currentTarget.querySelector('[data-loader-id]');
        const currentId = this.loaderIds[i] = Math.floor(Math.random() * 100000);

        if (currentTargetLoader) {
            currentTargetLoader.setAttribute('data-loader-id', currentId);
        } else {
            const currentLoader = this.createLoader();
            currentLoader.setAttribute('data-loader-id', currentId);

            if (this.target[i].matches('body')) {
                currentLoader.style.position = 'fixed';
            }

            this.target[i].appendChild(currentLoader);
        }
    });
    }

    createLoader() {
        const spinner = document.createElement('div');
        const loader = document.createElement('div');
        spinner.classList.add('loader__spinner');
        loader.classList.add('loader');
        loader.setAttribute('data-test', 'loader');
        loader.appendChild(spinner);

        if (this.modifier) {
            loader.classList.add('loader--' + this.modifier);
        }

        return loader;
    }
}
