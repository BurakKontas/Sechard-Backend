export default function ValidatePhone(phone) {
  const regex = /^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/gm;
  if (regex.test(phone)) {
      return (true)
    }
      return (false)
}

