import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { RootState } from "../../store";
import { IUpdateProductActionProps, ApiStatus, IProductForm } from "../../types/product";
import { createProductAction, resetCreateListStatus, updateProductAction} from "./productSlice";
import { useParams } from "react-router-dom";
import { toastError } from "../../components/ToastifyConfig";
import { useNavigate} from "react-router-dom"; 
import NavBar from "../../components/Navbar"
import { NumericFormat } from 'react-number-format';

interface IProps {
  isEditProduct?: boolean;
}




export default function CategoryForm(props: IProps) {
  const { isEditProduct } = props;
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQty(+e.target.value);
 }
  const params = useParams();
  const { createProductFormStatus, updateProductFormStatus } = useAppSelector(
    (state: RootState) => state.product
  );

  //edit
  const productIdToEdit = useRef(parseInt(params.id || ""));
  const { list } = useAppSelector((state: RootState) => state.product);

  console.log(list, "cek")
  useEffect(() => {
    if (isEditProduct && productIdToEdit.current) {
      // list of category
      const userData = list.filter((x) => x.id === productIdToEdit.current);

      if (userData.length) {
        setName(userData[0].name);
        setCode(userData[0].code)
        setQty(userData[0].qty)
        setPrice(userData[0].price)
       
      }
    }
  }, [isEditProduct, list]);

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const data: IProductForm= { name, code, qty, price };

    if (name && code && qty && price) {
      if (isEditProduct) {
        const dirtyFormData: IUpdateProductActionProps = {
          id: productIdToEdit.current,
          data,
        };

        console.log(dirtyFormData, "form data edit")
        dispatch(updateProductAction(dirtyFormData));
        navigator("/product")
      } else {
        const data: IProductForm = { name, code, qty, price  };
        dispatch(createProductAction(data));
        navigator("/product")
      }
    } else {
      toastError("Please fill the form");
    }
  };


  //create
  useEffect(() => {
    if (createProductFormStatus === ApiStatus.success) {
      setName("");
      setCode("")
      setQty(0)
      setPrice(0)
      dispatch(resetCreateListStatus());
    }
  }, [createProductFormStatus, dispatch]);

  return (
    <>
    <NavBar />
    <main className="py-10">
    <div className="container mx-auto">
      <form className="rounded-lg bg-white p-10 shadow-lg" onSubmit={onSubmitForm}>
        <div className="mb-4 flex items-center">
          <input type="text" className="w-full rounded-lg border border-gray-400 p-2" placeholder="Name Category Product" 
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
          
          />
        </div>
        <div className="mb-4 flex items-center">
          <input type="text" className="w-full rounded-lg border border-gray-400 p-2" placeholder="Name Category Product" 
          value={code}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCode(e.target.value);
          }}
          
          />
        </div>
        <div className="mb-4 flex items-center">
          <NumericFormat onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setQty(+e.target.value);
          }} className="w-full rounded-lg border border-gray-400 p-2" placeholder="qty"  value={qty} />
        </div>
        <div className="mb-4 flex items-center">
        <NumericFormat onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPrice(+e.target.value);
          }} className="w-full rounded-lg border border-gray-400 p-2" placeholder="Price"  value={price} />
        
          <input className="ml-2 rounded-lg bg-gray-500 p-2 text-white hover:bg-blue-600" 
          type="submit"
          value={isEditProduct ? "Update" : "Create"}
          disabled={
            createProductFormStatus === ApiStatus.loading ||
            updateProductFormStatus === ApiStatus.loading
          }
         />
        </div>
        
      </form>
    </div>
  </main></>
  )
}
