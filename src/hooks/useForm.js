import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  const [form, setForm] = useState( initialForm );
  
  const onChangeForm = ({ name, value }) => {
    setForm({
      ...form,
      [ name ]: value
    });
  }

  const onChangeFormMultiple = (form) => {
    setForm({
      ...form
    });
  }

  return {
    ...form,
    onChangeForm,
    onChangeFormMultiple
  }
}
