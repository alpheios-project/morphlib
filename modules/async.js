/**
 * Just an XmlHttpRequest helper
 *
 * @function
 * @memberOf CTS.utils
 * @name xhr
 *
 * @param  {string}     method             HTTP Method
 * @param  {string}     url                HTTP URI to call
 * @param  {?function}  options.success    Function to call when request is done.
 * @param  {string}     options.type       Type of data wished (default: text/xml)
 * @param  {any}        options.data       Data to send
 * @param  {?function}  options.error      Function to call when request gave an error.
 *
 */

export function async(method, url, options){
    var xhr,
        _this = this;

    if(typeof options === undefined) {
        options = {}
    }
    if(typeof options.type === "undefined") {
        options.type = "text/xml";
    }
    if(typeof options.async === "undefined") {
        options.async = true;
    }

    if (window && window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if(window && window.ActiveXObject) {
        var names,
            i;

        if (window.ActiveXObject) {
            names = [
                'Msxml2.XMLHTTP.6.0',
                'Msxml2.XMLHTTP.3.0',
                'Msxml2.XMLHTTP',
                'Microsoft.XMLHTTP'
            ];

            for (i in names)
                try {
                    return new ActiveXObject(names[i]);
                } catch (e) {}
        }
    } else {
        return null;
    }
    try {
        xhr.open(method, url, options.async);

        xhr.onerror = function() {
            if(typeof options.error === "function") {
                options.error(xhr.status, xhr.statusText);
            }
        }

        xhr.onreadystatechange = function() {
            if(xhr.status === 500 || xhr.status === 401 || xhr.status === 403 || xhr.status === 404 || xhr.status === 400) {
                if(typeof options.error === "function") {
                    options.error(xhr.status, xhr.statusText);
                }
            } else {
                if (xhr.readyState === 4) {
                    if(typeof options.success === "function") {
                        if(options.type === "text/xml") {
                            if(xhr.responseXML !== null && xhr.responseXML.innerHtml) {
                                try {
                                    var xml = (new DOMParser()).parseFromString(xhr.responseText, "text/xml");
                                } catch (e) {
                                    options.error(e)
                                }
                            } else {
                                options.success(xhr.responseXML);
                            }
                        } else if (options.type === "text" || options.type === "plain/text" || options.type === "text/plain") {
                            options.success(xhr.responseText);
                        }
                    }
                }
            }
        };
        if((typeof options.data !== "undefined" || options.data !== null) && method === "POST") {
            xhr.overrideMimeType("multipart/form-data");
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;");
            xhr.send(CTS.utils.dataEncode(options.data));
        } else {
            xhr.send();
        }

    } catch(err) {
        if(typeof options.error === "function") {
            options.error(err);
        }
    }
}