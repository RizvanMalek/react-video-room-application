
export default function Default(props) {
    const {
        children
    } = props;
    return (
        <div className="h-screen w-full bg-gray-900">
            {children}
        </div>
    );
}
