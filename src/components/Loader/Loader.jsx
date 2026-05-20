
import { Grid } from 'react-loader-spinner'

export default function Loader() {
  return (
    <div className="row w-full pt-5 items-center justify-center">
      <Grid
  visible={true}
  height="80"
  width="80"
  color="#2563EB"
  ariaLabel="grid-loading"
  radius="12.5"
  wrapperStyle={{}}
  wrapperClass="grid-wrapper"
  />
    </div>
    
  )
}
