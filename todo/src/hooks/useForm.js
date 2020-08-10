import {useState} from 'react';

export const useForm = initialFormState => {
const [value, setValue] = useState(initialFormState);

const handleChange = event => {
const {name, value} = event.target;
setValue({
    ...value,
    [name]: value
})
}

return [value, handleChange]
}