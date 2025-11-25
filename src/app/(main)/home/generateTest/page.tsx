import { Button } from '@/components/ui';
import NavBar from '@/components/ui/NavBar';
import colors from '@/theme/colors';

const GenerateTest = () => {
  return (
    <div className="flex flex-1 items-start">
      <NavBar page="Home" />

      <div
        className="ml-[108px] flex h-full min-h-screen flex-1 flex-col"
        style={{ backgroundColor: colors.neutral.background }}
      >
        <div className="flex items-end p-5">
          <Button text="Voltar" />

          <Button text="Gerar Prova" />
        </div>
      </div>
    </div>
  );
};

export default GenerateTest;
