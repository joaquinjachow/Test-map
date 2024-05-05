import Image from 'next/image';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {

  return (
    <main className="max-w-sm mx-auto rounded-xl overflow-hidden border-black border shadow-lg m-4 p-4 w-full">
      <div className='flex justify-center py-4 font-medium text-3xl'>
        {/*       <Image className='mt-5' src={} alt='' width={150} height={135}/> */}
        <h1 className='mt-6'>App Vendedores</h1>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <Formik
          initialValues={{ codigo: '', contraseña: '' }}
          validationSchema={Yup.object({
            codigo: Yup.string()
              .required('El código es requerido'),
            contraseña: Yup.string()
              .required('La contraseña es requerida')
              .min(6, 'La contraseña debe tener al menos 6 caracteres')
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className='mt-10'>
            <div className='space-y-5'>
              <div>
                <Field
                  className='border py-1.5 px-4 w-80 border-black rounded-xl bg-transparent placeholder:text-gray-500'
                  type="text"
                  name="codigo"
                  placeholder="Código"
                />
                <ErrorMessage name="codigo" component="div" className="text-red-500 mt-0.5" />
              </div>
              <div>
                <Field
                  className='border py-1.5 px-4 w-80 border-black rounded-xl bg-transparent placeholder:text-gray-500'
                  type="password"
                  name="contraseña"
                  placeholder="Contraseña"
                />
                <ErrorMessage name="contraseña" component="div" className="text-red-500 mt-0.5" />
              </div>
            </div>
            <div className='flex justify-center'>
              <button
                className="border-2 py-1.5 rounded-xl w-52 bg-[#0098FF] font-bold text-white mt-20"
                type="submit"
              >
                Ingresar
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </main>
  );
};
export default Login;