import jQuery from 'jquery';
/**
 * Just an XmlHttpRequest helper
 *
 *
 * @param  {string}     method             HTTP Method
 * @param  {string}     url                HTTP URI to call
 * @param  {string}     datatype           Return data type
 * @param  {?function}  success            Function to call when request is done
 *
 */

export default function async(url, method, datatype, success){
    jQuery.ajax({
        url: url,
        type: method,
        dataType: datatype,
        success: success
    });
}
    