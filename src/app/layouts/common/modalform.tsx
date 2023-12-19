import { observer } from "mobx-react-lite"
import { Button, Icon, Modal, ModalContent } from "semantic-ui-react"
import { useStore } from "../../api/stores/stores"

export default observer(function ModalForm() {
    const { modalFormStore } = useStore();
    function handleCloseModal() {
        modalFormStore.closeModal();
    }
    return (
        <Modal className={modalFormStore.className}
            open={modalFormStore.isOpen}
        >
            <ModalContent>
                {modalFormStore.body}
            </ModalContent>
            <Modal.Actions>
                <Button color='green' inverted onClick={handleCloseModal}>
                    <Icon name='checkmark' /> Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
})
