//-*- coding: utf-8 -*-
//© 2017 Therp BV <http://therp.nl>
//License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

odoo.define('web_onchange_action', function (require) {
    "use strict";
    
    var BasicModel = require('web.BasicModel');

    BasicModel.include({
        _rpc: function(params, options)
        {
            let promise = this._super.apply(this, arguments);
            if(params.method = 'onchange') {
                return promise.then(
                    function (result) {
                        if(result.domain && result.domain.action) {
                            result.value.action = result.domain.action;
                            delete result.domain.action;
                            delete result.warning;
                        }
                        return result;
                    }
                )
            } else {
                return promise;
            }
        },
        _applyOnChange: function(values, record, viewType)
        {
            var self = this,
                action = null;
            if(values.action)
            {
                console.log('applyOnChange: action');
                console.log(values.action);
                return self.do_action(values.action);
            } else {
                return this._super.apply(this, arguments);
            }
        },
    });
});