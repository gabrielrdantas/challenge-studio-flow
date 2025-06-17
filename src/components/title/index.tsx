interface ITitleProps {
  title: string;
}
const Title = ({ title }: ITitleProps) => {
  return <h1 className='text-2xl font-bold text-primary'>{title}</h1>;
};

export default Title;
