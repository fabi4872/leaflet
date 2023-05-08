import { useState } from 'react';

export const useForm = ( initialForm = {} ) => {
  const [form, setForm] = useState( initialForm );
  
  const onChangeForm = ({ name, value }) => {
    setForm({
      ...form,
      [ name ]: value
    });
  }

  return {
    ...form,
    onChangeForm
  }
}
