import React from 'react'
import batchSales from "../../../components/pageComponents/BatchSales"
import BatchSales from '../../../components/pageComponents/BatchSales'

const page = () => {
  return (
    <div className='Buynow-sec content 2xl:w-full w-[390px]  2xl:flex flex flex-row justify-center items-center  overflow-y-hidden overflow-x-hidden pb-20 2xl:ml-[360px]'>
        <div className="wrap-buynow w-full  flex justify-center items-cente">
            <BatchSales/>

        </div>


    </div>
  )
}

export default page