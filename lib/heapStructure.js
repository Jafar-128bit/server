class Heap {
    constructor(heapSize = 10) {
        this.items = [];
        this.heapSize = heapSize;
    }

    showHeap = () => {
        return this.items;
    }

    //For Inserting data and key Into the Heap
    insert = (key, value) => {
        this.items.push({ key, value });
        this.bubbleUp(this.items.length - 1);
    };

    //For Deleting data from the Heap
    delete = () => {
        const lastIndex = this.items.length - 1;
        this.swap(0, lastIndex);
        const deletedValue = this.items.pop();
        this.bubbleDown(0);
        return deletedValue;
    };

    deleteByKey = (key) => {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].key === key) {
                const lastIndex = this.items.length - 1;
                this.swap(i, lastIndex);
                this.items.pop();
                if (i !== lastIndex) {
                    // If the deleted value was not the last item in the heap, bubble it up or down as needed
                    if (this.items[i].key > this.items[Math.floor((i - 1) / 2)].key) {
                        this.bubbleUp(i);
                    } else {
                        this.bubbleDown(i);
                    }
                }
                return true;
            }
        }
        return false;
    };

    //This function searches for a key in the heap and returns its index if found, or -1 otherwise
    search = (key) => {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].key === key) {
                return this.items[i];
            }
        }
        return false;
    };

    //For checking Heap size
    size = () => {
        return this.items.length;
    };

    //This function takes an index and moves the corresponding node up the heap until it is in the correct position
    bubbleUp = (index) => {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.items[parentIndex].key < this.items[index].key) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else {
                break;
            }
        }
    };

    //This function takes an index and moves the corresponding node down the heap until it is in the correct position
    bubbleDown = (index) => {
        while (index < this.items.length) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largerChildIndex = null;
            if (leftChildIndex < this.items.length) {
                largerChildIndex = leftChildIndex;
            }
            if (
                rightChildIndex < this.items.length &&
                this.items[rightChildIndex].key > this.items[leftChildIndex].key
            ) {
                largerChildIndex = rightChildIndex;
            }
            if (largerChildIndex === null) {
                break;
            }
            if (this.items[index].key < this.items[largerChildIndex].key) {
                this.swap(index, largerChildIndex);
                index = largerChildIndex;
            } else {
                break;
            }
        }
    };

    //This function takes two indices and swaps the values at those indices in the items array
    swap = (index1, index2) => {
        const temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;
    };

    //For deleting if the heap size is greater then the max_size
    deleteIfGreater = () => {
        if (this.size > this.heapSize) {
            this.delete();
        }
    };
}

module.exports = Heap;