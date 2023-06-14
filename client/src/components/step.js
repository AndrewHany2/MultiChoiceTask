function Step({ word }) {
    return (<>
        <button type="button" className="btn btn-primary">{word?.word}</button>
    </>);
}

export default Step;