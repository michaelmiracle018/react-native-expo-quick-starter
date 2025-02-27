import { View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { Button } from '~/components/ui/button'
import { Text } from '~/components/ui/text'
import * as Layout from '~/components/layout'
import { statusBarHeight } from '~/lib/platform/detection'
import { tabBarHeight } from '~/hooks/useBottomBarHeight'
import { ThemeToggle } from '~/components/ThemeToggle'
import { msg, t, Trans } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { List } from '~/utils/List'
import { useMemo } from 'react'

// ! DON'T USE THIS NOT DONE WITH IT

interface PropsData {
    id: string;
    title: string
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];


export default function FlatListScreen() {
    const Toast = useToast()
    const { i18n } = useLingui()

    const data = Array(200)
        .fill(null)
        .map((_, i) => ({ id: i.toString(), title: `Item ${i + 1}` }));
    const dummyData = useMemo(() => {
        return data
    }, [])
    function keyExtractor(item: PropsData) {
        return item.id
    }

    function renderItem({ item, index }: { item: { title: string }; index: number }) {
        return (
            <View
            >
                <Text>
                    {item.title}
                </Text>

            </View>
        )
    }
    function onRefresh() {
        console.log("kkk");

    }

    return (

        <View
            className="bg-background spacing-1 flex-1"
            style={{ marginTop: statusBarHeight, marginBottom: tabBarHeight }}
        >
            <View className="flex-row justify-between items-center">
                <Text className="text-3xl">
                    <Trans>FlatList</Trans>
                </Text>
                <ThemeToggle />
            </View>
            <List
                data={dummyData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshing={false}
                onRefresh={onRefresh}
                // onEndReached={onEndReached}
                onEndReachedThreshold={3}
                initialNumToRender={2}
                windowSize={11}
                sideBorders={false}
            />
        </View>

    )
}
