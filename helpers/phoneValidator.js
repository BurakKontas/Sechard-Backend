export default function ValidatePhone(phone) 
{
 if (/^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/gm.test(phone))
  {
    return (true)
  }
    return (false)
}

