export default async function ValidateModel(obj) {
    try {
        await obj.validate();
        return { error:false };
    } catch(err) {
        var output = {
            error:true,
            errors:[],
        }
        Object.keys(err.errors).forEach((val) => {
            output.errors.push({
              field:err.errors[val].properties.path,
              reason:(err.errors[val].properties.reason) ? err.errors[val].properties.reason : err.errors[val].message,
            })
        })
        return output;
    }
}

/* örnek error çıktısı
Error: User validation failed: _id: Validator failed for path `_id` with value ``, dictionary: Validator failed for path `dictionary` with value ``
    at ValidationError.inspect (C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\error\validation.js:50:26)
    at formatValue (node:internal/util/inspect:780:19)
    at inspect (node:internal/util/inspect:345:10)
    at formatWithOptionsInternal (node:internal/util/inspect:2165:40)
    at formatWithOptions (node:internal/util/inspect:2027:10)
    at console.value (node:internal/console/constructor:324:14)
    at console.log (node:internal/console/constructor:360:61)
    at ValidateModel (file:///C:/Users/konta/Desktop/Sechard%20Backend/helpers/validateModels.js:6:17)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async file:///C:/Users/konta/Desktop/Sechard%20Backend/routes/user.js:11:20 {
  errors: {
    _id: ValidatorError: Validator failed for path `_id` with value ``
        at validate (C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\schematype.js:1346:13)
        at SchemaArray.SchemaType.doValidate (C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\schematype.js:1330:7)
        at C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\document.js:2903:18
        at processTicksAndRejections (node:internal/process/task_queues:78:11) {
      properties: [Object],
      kind: 'user defined',
      path: '_id',
      value: [],
      reason: 'Bir ID girmelisiniz.',
      [Symbol(mongoose:validatorError)]: true
    },
    dictionary: ValidatorError: Validator failed for path `dictionary` with value ``
        at validate (C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\schematype.js:1346:13)
        at SchemaArray.SchemaType.doValidate (C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\schematype.js:1330:7)
        at C:\Users\konta\Desktop\Sechard Backend\node_modules\mongoose\lib\document.js:2903:18
        at processTicksAndRejections (node:internal/process/task_queues:78:11) {
      properties: [Object],
      kind: 'user defined',
      path: 'dictionary',
      value: [],
      reason: 'Bir sözlük girmelisiniz.',
      [Symbol(mongoose:validatorError)]: true
    }
  },
  _message: 'User validation failed'
}
*/