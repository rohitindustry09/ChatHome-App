export default function GetIconAlongText({ setText='', setAncestorIdName, setStyle, setIconClassName, refs, methodCall }) {
 return (
  <>
    <span id={setAncestorIdName} style={setStyle}
     ref={refs} onClick={methodCall}> 
      <i className={setIconClassName}></i>
      {
        setText !== '' ? <span> {setText} </span>
        : <></>
      }
    </span>
  </>
 );
}