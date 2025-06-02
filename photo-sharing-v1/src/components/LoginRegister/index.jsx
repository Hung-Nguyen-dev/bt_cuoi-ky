
import { useForm } from 'react-hook-form';

function LoginRegister() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        try {
            const req = await fetch("http://localhost:8081/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (req.ok) {
                const resData = await req.json();
                console.log("Login success:", resData);
            } else {
                console.error("Login failed:", req.status);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(submit)}>
                Login_name: <input type="text" {...register('login_name', { required: true })} />
                <button>Login</button>
                {errors.login_name && <p>required login_name</p>}
            </form>
        </div>
    )
}

export default LoginRegister;