import Image from 'next/image';

function Home() {
  return (
    <div>
      <Image src="/cake.jpg" width="400" height="300" alt='cake2' />
        <div>
            <h1> Iris Backer </h1>
            <p> CAKES TO FIT ANY TASTE </p>
           
        </div>
    </div>
  )
}

export default Home;