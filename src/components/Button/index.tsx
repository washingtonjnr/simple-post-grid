// styles
import "./styles.scss";

type ButtonProps = {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => {};
};

const Button: React.FC<ButtonProps> = ({ 
    className, 
    children, 
    onClick, 
    disabled,
}) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled} 
        className={`btn-pattern ${className}`}
    >
        {children}
    </button>
  );
};

export default Button;
