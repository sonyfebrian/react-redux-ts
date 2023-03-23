import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hook";
import { RootState } from "../../store";
import { IUpdateProductListActionProps, ApiStatus, IProductListForm} from "../../types/productList";
import { updateProductListAction, resetCreateListStatus, createProductListAction } from "./productListSlice";
import { useParams } from "react-router-dom";
import { toastError } from "../../components/ToastifyConfig";
import { useNavigate} from "react-router-dom"; 
import NavBar from "../../components/Navbar"


interface IProps {
    isEditProducts?: boolean;
  }
  
  export default function ProductsForm(props: IProps) {
    const { isEditProducts} = props;
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const [name, setName] = useState("");
    const [plu, setPlu] = useState("");
    
    const params = useParams();
    const { createProductListFormStatus, updateProductListFormStatus } = useAppSelector(
      (state: RootState) => state.products
    );
  
    //edit
    const productsIdToEdit = useRef(parseInt(params.id || ""));
    const { list } = useAppSelector((state: RootState) => state.products);
  
    console.log(list, "cek")
    useEffect(() => {
      if (isEditProducts && productsIdToEdit.current) {
        // list of category
        const userData = list.filter((x) => x.id === productsIdToEdit.current);
  
        if (userData.length) {
          setName(userData[0].name);
          setPlu(userData[0].plu)
        }
      }
    }, [isEditProducts, list]);
  
    const onSubmitForm = (e: React.FormEvent) => {
      e.preventDefault();
  
      const data: IProductListForm= { name, plu };
  
      if (name && plu) {
        if (isEditProducts) {
          const dirtyFormData: IUpdateProductListActionProps = {
            id: productsIdToEdit.current,
            data,
          };

          dispatch(updateProductListAction(dirtyFormData));
         
          navigator("/products")
          window.location.reload()
        } else {
          const data: IProductListForm = { name, plu};
          dispatch(createProductListAction(data));
          
          navigator("/products")
          window.location.reload()
        }
      } else {
        toastError("Please fill the form");
      }
    };
  
  
    //create
    useEffect(() => {
      if (createProductListFormStatus === ApiStatus.success) {
        setName("");
        setPlu("")
        dispatch(resetCreateListStatus());
       
      }
    }, [createProductListFormStatus, dispatch]);
  
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
            value={plu}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPlu(e.target.value);
            }}
            
            />
          </div>
          
          <div className="mb-4 flex items-center">
          
            <input className="ml-2 rounded-lg bg-gray-500 p-2 text-white hover:bg-blue-600" 
            type="submit"
            value={isEditProducts ? "Update" : "Create"}
            disabled={
              createProductListFormStatus === ApiStatus.loading ||
              updateProductListFormStatus === ApiStatus.loading
            }
           />
          </div>
          
        </form>
      </div>
    </main></>
    )
  }