import { useContext } from "react";
import { ActivityIndicator, Modal ,View} from "react-native";
import { AppContext } from "./globalVariables";

export function Preloader() {
  const { preloader } = useContext(AppContext)
  return (
    <>
      <Modal
        visible={preloader}
        transparent={true}
      >
        <View style={{ justifyContent: "center", flex: 1, alignItems: "center", backgroundColor: "#ffffffcd" }}>
          <ActivityIndicator size="large" color="#2F80ED" />
        </View>
      </Modal>
    </>
  )
}