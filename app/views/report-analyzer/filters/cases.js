import app from '~/app';
import _ from 'lodash';
    ;

    app.filter("kebabcase", [function() {
        return function(text) {
            return text ? _.kebabCase(text) : text;
        };
    }]);

    app.filter("camelcase", [function() {
        return function(text) {
            return text ? _.camelCase(text) : text;
        };
    }]);

    app.filter("snakecase", [function() {
        return function(text) {
            return text ? _.snakeCase(text) : text;
        };
    }]);

