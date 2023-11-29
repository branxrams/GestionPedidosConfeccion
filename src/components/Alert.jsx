export default function Alert({ alert }) {
    return (
        <div
            className={`${
                alert.error
                    ? "from-red-400 to-red-600"
                    : "from-seagull-400 to-seagull-600"
            } bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}
        >
            {alert.msg}
        </div>
    );
}
