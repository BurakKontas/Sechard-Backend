export default async function ValidateModel(obj) {
    try {
        await obj.validate();
        return { "error":false };
    } catch(err) {
        var output = {
            "error":true,
            "errors":[]
        }
        Object.keys(err.errors).forEach((val) => {
            output.errors.push(err.errors[val].properties.reason)
        })
        return output;
    }
}
