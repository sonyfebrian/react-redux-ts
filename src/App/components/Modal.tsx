  interface IProps {
  
    children: JSX.Element;
    onClose: () => void;
  }

export const CustomModal = (props: IProps) => {
  const {  children, onClose } = props;
   
    return (
  
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      >
        {children}
      </div>
  
    );
  
  }